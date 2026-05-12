export const getCars = async () => {
  try {
    const res = await fetch("/api/cars");

    if (!res.ok) throw new Error("Impossible de recuperer les voitures.");

    const { cars } = await res.json();
    return cars;
  } catch (err) {
    console.log("Error finded:", err);
    return;
  }
};