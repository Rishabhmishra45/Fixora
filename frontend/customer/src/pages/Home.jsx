const Home = () => {
  return (
    <main className="flex-1 px-6 py-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">
          Book trusted local services with Fixora
        </h2>

        <p className="text-secondary max-w-2xl mx-auto mb-10">
          Electricians, plumbers, cleaners and more — all verified,
          professional, and at your doorstep.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {["Electrician", "Plumber", "Cleaning"].map((service) => (
            <div
              key={service}
              className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition"
            >
              <h3 className="font-semibold text-lg mb-2">
                {service}
              </h3>
              <p className="text-sm text-secondary">
                Professional {service.toLowerCase()} services at your doorstep.
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
