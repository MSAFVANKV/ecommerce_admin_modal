import { Button } from '@mui/material'
import { useEffect, useRef } from 'react'

type Props = {
    onClose: () => void; // Callback to close the component
    isOpen: boolean;
  };
  
  export default function AddNewSize({ onClose, isOpen }: Props) {
    const sizePickerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          sizePickerRef.current &&
          !sizePickerRef.current.contains(event.target as Node)
        ) {
          onClose(); // Call the callback to close the component
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose]);
  

  return (

    <>
    {
        isOpen && (
            <div className='  border rounded-lg flex gap-3 p-1 items-center bg-gray-100' ref={sizePickerRef}>
            <input type="text" placeholder="New Size" className="border rounded-md px-4 w-[150px] py-2 h-10" />
          <Button
          type='button'
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '5px',
            backgroundColor: '#5F08B1',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#450586',
            },
          }}
          >
         Save
          </Button>
        </div>
        )
    }
    </>
  
  )
}