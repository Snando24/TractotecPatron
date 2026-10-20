import { Circle } from "lucide-react";
import { useProjects } from "../hooks/useProjects";
import { sortByDate } from "../utils/projectsLoader";
import { PROJECT_STATUS } from "../constants/projects";
import { formatDateRelative } from "../utils/dateUtils";

function WorkshopTicker() {
  const projects = useProjects();
  const updates = sortByDate(
    projects.filter((project) => project.status === "en_progreso" || project.featured)
  ).slice(0, 6);

  if (updates.length === 0) return null;

  const items = [...updates, ...updates];

  return (
    <section
      aria-label="Novedades del taller"
      className="relative bg-red-600/10 border-b border-red-600/20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 shrink-0 pr-4 border-r border-red-600/30">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.15em] text-red-400">
            Novedades
          </span>
        </div>

        <div className="overflow-hidden flex-1">
          <div className="animate-marquee flex gap-10 whitespace-nowrap">
            {items.map((project, index) => {
              const status = PROJECT_STATUS[project.status] ?? PROJECT_STATUS.completado;

              return (
                <div
                  key={`${project.id}-${index}`}
                  className="inline-flex items-center gap-3 text-sm text-gray-300"
                >
                  <Circle
                    size={8}
                    className={
                      project.status === "en_progreso"
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-green-500 fill-green-500"
                    }
                  />
                  <span className="font-semibold text-white">{project.title}</span>
                  <span className="text-red-400">·</span>
                  <span className="text-gray-500">{status.label}</span>
                  <span className="text-red-400">·</span>
                  <span className="text-gray-500">
                    {formatDateRelative(project.date)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkshopTicker;
