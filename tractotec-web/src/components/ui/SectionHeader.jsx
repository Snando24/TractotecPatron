function SectionHeader({ eyebrow, title, highlight, description, align = "left" }) {
  const alignment =
    align === "center"
      ? "text-center items-center mx-auto"
      : "text-left items-start";

  return (
    <div className={`flex flex-col max-w-3xl mb-16 ${alignment}`}>
      {eyebrow && (
        <p className="text-yellow-500 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight">
        {title}{" "}
        {highlight && <span className="text-red-600">{highlight}</span>}
      </h2>

      <div
        className={`w-24 h-1 bg-red-600 mt-6 ${align === "center" ? "mx-auto" : ""}`}
      />

      {description && (
        <p className="text-gray-400 mt-6 leading-relaxed">{description}</p>
      )}
    </div>
  );
}

export default SectionHeader;
