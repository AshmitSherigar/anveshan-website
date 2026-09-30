import { Link } from 'react-router-dom';

import PageHeading from '../components/PageHeading.jsx';

const HomePage = () => (
  <section>
    <PageHeading
      eyebrow="Welcome"
      title="Anveshan Website"
      description="This is the starting point for the Anveshan frontend. Add product content here as the project grows."
    />
    <Link className="mt-8 inline-block rounded bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800" to="/about">
      Learn about the project
    </Link>
  </section>
);

export default HomePage;
