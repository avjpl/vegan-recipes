import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

import css from './layout.module.css';

const Layout = ({ children }) => {
  return (
    <motion.div exit={{ opacity: 0 }}>
      <div className={css.layout}>
        {children}
      </div>
    </motion.div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Layout;
