const PageHeading = ({ eyebrow, title, description }) => (
  <div className="max-w-2xl">
    {eyebrow && (
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-700">{eyebrow}</p>
    )}
    <h1 className="text-4xl font-bold tracking-tight text-slate-950">{title}</h1>
    {description && <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>}
  </div>
);

export default PageHeading;
