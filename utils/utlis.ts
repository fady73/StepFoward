// Helper function to create filters
export const createFilter = (filter, searchQuery) => {
    let filters = [
      {
        property: 'status',
        select: {
          equals: '✅ Published'
        }
      }
    ];
  
    if (searchQuery) {
      filters.push({
        property: 'title', // Adjust the property name to match your Notion database
        text: {
          contains: searchQuery
        }
      });
    }
  
    if (filter) {
      filters.push({
        property: 'categories', // Adjust the property name to match your Notion database
        multi_select: {
          contains: filter
        }
      });
    }
  
    return {
      and: filters
    };
  };