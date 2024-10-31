import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiMiniTrash } from "react-icons/hi2";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react";


export default function DropdownOption({ children, handleOnDelete  }) {
  const [openAlert, setOpenAlert] = useState(false);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Aktionen</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className='text-red-500 data-[highlighted]:text-red-700 data-[highlighted]:bg-red-50 flex justify-between items-center gap-1'
          onClick={() => setOpenAlert(true)}>
          <HiMiniTrash className="flex-none"/> Pfad Löschen
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={openAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Achtung!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Lernpfad endgültig löschen? Diese Aktion kann nicht rückgängig gemacht werden!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
            onClick={() => setOpenAlert(false)}
            >
              Abbrechen
            </AlertDialogCancel>
            <AlertDialogAction
            className='text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-200'
            onClick={() => {
              handleOnDelete();
              setOpenAlert(false);
              }}>Fortfahren</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ) //5:12:42
}
