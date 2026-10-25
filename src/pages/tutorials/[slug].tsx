import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import TutorialPage from "../../components/Tutorials/TutorialPage";
import {
  TUTORIALS,
  tutorialBySlug,
} from "../../components/Tutorials/content";

interface TutorialProps {
  slug: string;
}

// Content is looked up by slug rather than passed as props, because it
// includes functions for the diagrams
const Tutorial = ({ slug }: TutorialProps) => {
  const tutorial = tutorialBySlug(slug);
  if (!tutorial) return null;

  return (
    <>
      <Head>
        <title>{`Cubetimer.io | How to solve the ${tutorial.name}`}</title>
        <meta name="description" content={tutorial.tagline} />
      </Head>
      <TutorialPage tutorial={tutorial} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: TUTORIALS.map((t) => ({ params: { slug: t.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<TutorialProps> = async ({ params }) => ({
  props: { slug: String(params?.slug) },
});

export default Tutorial;
