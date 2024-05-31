// Define a custom type for the filter object
interface Filter {
    property: string;
    select?: {
      equals: string;
    };
    multi_select?: {
      contains: string;
    };
    text?: {
        contains: string;
      };
  }
  
  // Helper function to create filters
  export const createFilter = (filter: string, searchQuery: string): { and: Filter[] } => {
    let filters: Filter[] = [
      {
        property: 'status',
        select: {
          equals: '✅ Published'
        }
      }
    ];
  
    if (searchQuery) {
      filters.push({
        property: 'title',
        text: {
          contains: searchQuery
        }
      });
    }
  
    if (filter) {
      filters.push({
        property: 'categories',
        multi_select: {
          contains: filter
        }
      });
    }
  
    return {
      and: filters
    };
  };
  