
// ? Fonction de recuperation d'un utitlisateur par son email
export const GetUser = async (email: string) => {
  try {
    const res = await fetch(`/api/getUser`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok)
      throw new Error(data.error || "Can't find user : Fatale error");
    
    return data;
  } catch (err) {
    console.log("Error Finded:", err);
    return;
  }
};