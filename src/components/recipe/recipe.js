import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import propTypes from 'prop-types';

import {
  motion,
  AnimatePresence
} from 'framer-motion';

import css from './recipe.module.css';

const Recipe = ({ image, slug }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <motion.li
      layout
      onMouseEnter={toggleOpen}
      onMouseLeave={toggleOpen}
      className={css.recipe}
    >
      <motion.div
        layout
        className={css.recipe__image}
      >
        <Image
          src={`https:${image.file.url}`}
          layout='fill'
        />
      </motion.div>

      <AnimatePresence>
        {
          isOpen && <motion.div
            layout
            className={css.recipe__wrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Link href={`/recipe/${slug}`}>
              <a className={css.recipe__link}>Recipe</a>
            </Link>
          </motion.div>
        }
      </AnimatePresence>
    </motion.li>
  );
};

Recipe.propTypes = {
  image: propTypes.object.isRequired,
  slug: propTypes.string.isRequired,
};

export default Recipe;
