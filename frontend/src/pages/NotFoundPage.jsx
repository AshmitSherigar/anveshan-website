import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <section>
    <h1 className="text-4xl font-bold tracking-tight text-slate-950">Page not found</h1>
    <p className="mt-4 text-lg text-slate-600">The page you requested does not exist.</p>
    <Link className="mt-8 inline-block text-blue-700 underline" to="/">
      Return home
    </Link>
  </section>
);

export default NotFoundPage;
