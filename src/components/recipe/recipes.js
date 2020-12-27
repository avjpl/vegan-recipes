import { useQuery } from '@apollo/client';
import {
  motion,
  AnimateSharedLayout,
} from 'framer-motion';

import Recipe from './recipe';
import { RECIPES_QUERY } from '../../apollo/queries';

import css from './recipe.module.css';

export default function Recipes() {
  const {
    data: { recipes } = {}, loading, error,
  } = useQuery(RECIPES_QUERY);

  if (error) return <div>Errored</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <AnimateSharedLayout>
      <motion.ul className={css.recipe__list}>
        {
          recipes?.map(recipe => {
            return <Recipe key={recipe.id} {...recipe} />;
          })
        }
      </motion.ul>
    </AnimateSharedLayout>
  );
}
