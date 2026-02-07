import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getMyAddresses,
  addAddress,
  deleteAddress,
  setDefaultAddress
} from "../../api/addressApi";

const Addresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState({
    label: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: ""
  });

  const loadAddresses = async () => {
    const res = await getMyAddresses();
    setAddresses(res.data.addresses);
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await addAddress(form);
    setForm({
      label: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: ""
    });
    loadAddresses();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 space-y-8"
    >
      <h1 className="text-3xl font-bold">
        My Addresses
      </h1>

      {/* ADD ADDRESS */}
      <form
        onSubmit={submit}
        className="bg-card border border-border rounded-lg p-6 grid gap-4"
      >
        <input
          placeholder="Label (Home / Work)"
          className="p-3 border rounded"
          value={form.label}
          onChange={(e) =>
            setForm({ ...form, label: e.target.value })
          }
        />
        <textarea
          placeholder="Address line"
          className="p-3 border rounded"
          value={form.addressLine}
          onChange={(e) =>
            setForm({
              ...form,
              addressLine: e.target.value
            })
          }
        />
        <input
          placeholder="City"
          className="p-3 border rounded"
          value={form.city}
          onChange={(e) =>
            setForm({ ...form, city: e.target.value })
          }
        />
        <input
          placeholder="State"
          className="p-3 border rounded"
          value={form.state}
          onChange={(e) =>
            setForm({ ...form, state: e.target.value })
          }
        />
        <input
          placeholder="Pincode"
          className="p-3 border rounded"
          value={form.pincode}
          onChange={(e) =>
            setForm({
              ...form,
              pincode: e.target.value
            })
          }
        />

        <button className="bg-primary text-white py-2 rounded">
          Add Address
        </button>
      </form>

      {/* ADDRESS LIST */}
      <div className="space-y-4">
        {addresses.map((a) => (
          <div
            key={a._id}
            className="bg-card border border-border rounded-lg p-4"
          >
            <p className="font-semibold">
              {a.label}{" "}
              {a.isDefault && (
                <span className="text-primary">
                  (Default)
                </span>
              )}
            </p>
            <p className="text-sm">
              {a.addressLine}, {a.city}, {a.state} –{" "}
              {a.pincode}
            </p>

            <div className="flex gap-3 mt-2">
              {!a.isDefault && (
                <button
                  onClick={() =>
                    setDefaultAddress(a._id).then(
                      loadAddresses
                    )
                  }
                  className="text-primary text-sm"
                >
                  Set Default
                </button>
              )}

              <button
                onClick={() =>
                  deleteAddress(a._id).then(
                    loadAddresses
                  )
                }
                className="text-red-600 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Addresses;