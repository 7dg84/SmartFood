export function StatsSection() {
  const stats = [
    {
      value: '1,200+',
      label: 'Alimentos Catalogados'
    },
    {
      value: '95%',
      label: 'Cumplimiento Promedio'
    },
    {
      value: '500+',
      label: 'Escuelas Participantes'
    }
  ];

  return (
    <section className="py-16 bg-emerald-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-5xl text-emerald-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-700 text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
