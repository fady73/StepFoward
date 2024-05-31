import Category from 'components/Category';
import React from 'react';

const CategoryList = ({ allCategories, selectedTag, setSelectedTag }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      {allCategories.map(tag => (
        <Category
          tag={tag}
          key={tag}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      ))}
    </div>
  );
};

export default CategoryList;
