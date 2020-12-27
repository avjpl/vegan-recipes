import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { motion, useAnimation } from 'framer-motion';

import Layout from '../components/layout';
import { initializeApollo } from '../apollo/client';
import { RECIPES_QUERY } from '../apollo/queries';

import css from './index.module.css';

const transition = {
  duration: .1,
  ease: 'easeInOut',
};

const variants = {
  hide: {
    scale: 0,
    opacity: 0,
    transition,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition,
  }
};

export default function Recipes() {
  const {
    data: { recipes } = {}, loading, error,
  } = useQuery(RECIPES_QUERY);

  const [isOpen, setIsOpen] = useState(false);
  const animation = useAnimation();

  const handleMouseEnter = (evt) => {
    setIsOpen(!isOpen);
    animation.start('show');
    console.log({ isOpen });
    console.log({ target: evt.target });
    console.log({ target: evt.currentTarget });
  };
  
  const handleMoveLeave = (evt) => {
    setIsOpen(!isOpen);
    animation.start('hide');
    console.log({ isOpen });
    console.log({ target: evt.target });
    console.log({ target: evt.currentTarget });
  };

  if (error) return <div>Errored</div>;
  if (loading) return <div>Loading...</div>;
  
  return (
    <Layout>
      {
        recipes?.map(recipe => {
          return (
            <motion.div
              className={css.recipe}
              key={recipe.id}
            >
              <div
                className={css.recipe__image}
                onMouseEnter={handleMouseEnter}
              >
                <Image
                  src={`https:${recipe.image.file.url}`}
                  layout='fill'
                />  
              </div>

              { 
                
                <motion.div
                  className={css.recipe__wrapper}
                  onMouseLeave={handleMoveLeave}
                  variants={variants}
                  animate={animation}
                  initial={'hide'}
                >
                  <Link href={`/recipe/${recipe.slug}`}>
                    <a className={css.recipe__link}>Recipe</a>
                  </Link>
                </motion.div>
              }
            </motion.div>
          );
        })
      }
    </Layout>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: RECIPES_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
