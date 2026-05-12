import { Button } from "@mui/material";

interface Props{
    values: {
        price: number;
        title: string;
        model: string;
        brand: string;
        description: string;
        city: string;
    };
    onChange: (e: string)=>void;
    handleSubmit: () => void
}

export default function EditCarForm({values, onChange, handleSubmit}: Props){
  // const [formData, setFormData] = useState({
  //   title: title,
  //   price: price,
  //   model: model,
  //   brand: brand,
  //   description: description,
  //   city: city,
  // });
    return(<form
      className="flex flex-col gap-3 justify-center p-5 w-1/2 border border-gray-300 bg-slate-500 rounded-md"
      onSubmit={handleSubmit}
    >
      <input
        onChange={(e) => onChange(e.target.value)}
        value={values.title}
        name="title"
        className="p-2 bg-slate-200 text-black rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
        type="text"
        placeholder="title"
      />
      <input
        onChange={(e) => onChange(e.target.value)}
        value={values.price}
        name="price"
        className="p-2 bg-slate-200 text-black rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
        type="number"
        placeholder="price"
      />
      <input
        onChange={(e) => onChange(e.target.value)}
        value={values.model}
        name="model"
        className="p-2 bg-slate-200 text-black rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
        type="text"
        placeholder="model"
      />
      <input
        onChange={(e) => onChange(e.target.value)}
        value={values.brand}
        name="brand"
        className="p-2 bg-slate-200 text-black rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
        type="text"
        placeholder="brand"
      />
      <input
        onChange={(e) => onChange(e.target.value)}
        value={values.description}
        name="description"
        className="p-2 bg-slate-200 text-black rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
        type="text"
        placeholder="description"
      />
      <input
        onChange={(e) => onChange(e.target.value)}
        value={values.city}
        name="city"
        className="p-2 bg-slate-200 text-black rounded-md focus:ring-amber-300 focus:ring-2 font-bold"
        type="text"
        placeholder="city"
      />
      <div>
        <Button variant="contained" color="primary" type="submit" className="rounded-md ">
          Edit
        </Button>
      </div>
    </form>)
}