"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

function Remove({id}: {id: string}) {
    const router = useRouter()
    const removeCar = async ()=>{
        const confirmed = confirm("Etes vous sure de vouloire supprimer cette voiture ? ");
        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/cars?id=${id}`,{
                method: "DELETE"
            });
            if(res.ok){
                router.refresh()
            }
        }
    }
  return (
    <Button onClick={removeCar} variant="contained" className="bg-red-500 text-white">
      Remove Car
    </Button>
  );
}

export default Remove;