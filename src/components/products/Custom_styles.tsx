// reactSelectStyles.ts
export const customStyles = {
    control: (base: any) => ({
      ...base,
      borderColor: 'gray',
      borderRadius: '8px',
      padding: '5px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#1E40AF',
      },
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: '#4A90E2',
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: '#ffffff',
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: '#ffffff',
      ':hover': {
        backgroundColor: '#ff0000',
      },
    }),
    placeholder: (base: any) => ({
      ...base,
      color: 'gray',
    }),
  };
  