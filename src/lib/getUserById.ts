
export const getUserById = async (ownerId: string) => {

  try{
    const res = await fetch("/api/getUser/1", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({ownerId})
    });
    const user = await res.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
