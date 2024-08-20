import PropTypes from 'prop-types';

function Option({ value, label }) {
  return <option value={value}>{label}</option>;
}

Option.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Option;
