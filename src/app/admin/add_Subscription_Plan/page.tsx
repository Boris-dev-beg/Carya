"use client";
import { useState } from "react";

export default function AddSubscriptionPlanForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [benefitInput, setBenefitInput] = useState("");

  const handleAddBenefit = () => {
    if (benefitInput.trim() !== "") {
      setBenefits([...benefits, benefitInput.trim()]);
      setBenefitInput("");
    }
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      // ? Envoie des donnees au back-end
      const res = await fetch("http://localhost:3000/api/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, duration, benefits }),
      });

      if (!res.ok) {
        alert("Erreur lors de la création du plan.");
        return
      }
        alert("Plan de souscription créé avec succès !");
        setName("");
        setPrice(0);
        setDuration(0);
        setBenefits([]);
    } catch (error) {
      console.error(error);
      alert("Erreur serveur.");
    }
  };

  return (
    <div className="absolute inset-0 max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Ajouter un plan de souscription
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nom du plan */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nom du plan
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Ex: PREMIUM"
            required
          />
        </div>

        {/* Prix */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prix
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Ex: 5000"
            required
          />
        </div>

        {/* Durée */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Durée (en jours)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Ex: 30"
            required
          />
        </div>

        {/* Avantages */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Avantages
          </label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              value={benefitInput}
              onChange={(e) => setBenefitInput(e.target.value)}
              className="flex-1 px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Ex: Publier 10 annonces"
            />
            <button
              type="button"
              onClick={handleAddBenefit}
              className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Ajouter
            </button>
          </div>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            {benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        {/* Bouton de soumission */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700"
        >
          Enregistrer le plan
        </button>
      </form>
    </div>
  );
}
