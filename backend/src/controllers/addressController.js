import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const { label, addressLine, city, state, pincode } =
      req.body;

    if (!addressLine || !city || !state || !pincode) {
      return res
        .status(400)
        .json({ message: "All fields required" });
    }

    const existingDefault = await Address.findOne({
      user: req.user.id,
      isDefault: true
    });

    const address = await Address.create({
      user: req.user.id,
      label,
      addressLine,
      city,
      state,
      pincode,
      isDefault: !existingDefault
    });

    res.status(201).json({ address });
  } catch (err) {
    res.status(500).json({ message: "Failed to add address" });
  }
};

export const getMyAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      user: req.user.id
    }).sort({ isDefault: -1, createdAt: -1 });

    res.json({ addresses });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch addresses" });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const address = await Address.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!address) {
      return res.status(404).json({
        message: "Address not found"
      });
    }

    Object.assign(address, req.body);
    await address.save();

    res.json({ address });
  } catch (err) {
    res.status(500).json({ message: "Failed to update" });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!address) {
      return res.status(404).json({
        message: "Address not found"
      });
    }

    if (address.isDefault) {
      const next = await Address.findOne({
        user: req.user.id
      }).sort({ createdAt: -1 });

      if (next) {
        next.isDefault = true;
        await next.save();
      }
    }

    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const setDefaultAddress = async (req, res) => {
  try {
    await Address.updateMany(
      { user: req.user.id },
      { isDefault: false }
    );

    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { isDefault: true },
      { new: true }
    );

    res.json({ address });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to set default" });
  }
};
