interface DataInfo {
  value: string;
  label: string;
}

const data: DataInfo[] = [
  { value: "+25", label: "Oficinas a nivel mundial" },
  { value: "#1", label: "Consolidados terrestre Panamá - CRC" },
  { value: "+105", label: "Rutas de transporte internacional" },
  { value: "24/7", label: "Atención a nuestros clientes" },
];

function DataComponent() {
  return (
    <section className="w-full bg-red-800 px-6 py-16 text-white md:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {data.map((item, index) => (
          <div
            key={item.label}
            className={`px-5 text-center ${index > 0 ? "lg:border-l lg:border-white/15" : ""}`}
          >
            <span className="block text-[clamp(2.5rem,5vw,4rem)] font-extrabold leading-none tracking-[-0.04em] text-white">
              {item.value}
            </span>
            <p className="mx-auto mt-3 max-w-[230px] text-sm leading-6 text-white/65">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DataComponent;
