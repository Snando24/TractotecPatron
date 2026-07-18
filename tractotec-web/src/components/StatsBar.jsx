import { SITE_STATS } from "../constants/site";

function StatsBar() {
  return (
    <section className="relative border-y border-gray-800/80 bg-gray-950/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {SITE_STATS.map((stat) => (
            <div key={stat.label} className="text-center group">
              <p className="text-3xl md:text-4xl font-bold font-display text-white group-hover:text-red-500 transition-colors">
                {stat.value}
              </p>
              <p className="text-gray-500 text-sm mt-2 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsBar;
