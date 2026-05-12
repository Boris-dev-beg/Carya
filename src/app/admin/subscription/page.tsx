import SubscriptionCards from "./SubscriptionCards";

const SubscriptionTab = [
  {
    id: 1,
    title: "Free",
    advantages: ["Advantage 1", "Advantage 2", "Advantage 3", "Advantage 4"],
  },
  {
    id: 2,
    title: "Classic",
    advantages: ["Advantage 1", "Advantage 2", "Advantage 3", "Advantage 4"],
  },
  {
    id: 3,
    title: "Pro",
    advantages: ["Advantage 1", "Advantage 2", "Advantage 3", "Advantage 4"],
  },
];

export default function page() {
  return (
    <section className="bg-slate-800 p-3 w-full h-full flex flex-col">
      <div className="w-full p-4 bg-slate-400">
        <h1 className="font-bold text-3xl text-white">Subscription plans</h1>
      </div>
      <div className="grid grid-cols-3 bg-slate-600 w-full gap-5">
        {SubscriptionTab.map((sub) => (
          <SubscriptionCards key={sub.id} subscription={sub} />
        ))}
      </div>
    </section>
  );
}
