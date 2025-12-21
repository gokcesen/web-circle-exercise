import styles from "./SearchField.module.css";

const SearchField = ({ searchItem, onSearch }) => {
  
  return (
    <div className={styles.wrapper}>
      <input
        placeholder="Filter dishes..."
        type="text" 
        value={searchItem}
        onChange={(e) => onSearch(e.target.value)}    
      />
    </div>
  );
};

export default SearchField;
