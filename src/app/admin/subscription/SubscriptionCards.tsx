interface SubscriptionTab {
  id: number;
  title: string;
  advantages: string[];
}
export default function SubscriptionCards({
  subscription,
}: {
  subscription: SubscriptionTab;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 h-36 rounded-2xl border-2 border-amber-200 p-4">
      <h1 className="font-black text-2xl text-center">{subscription.title}</h1>
      <ul>
        {subscription.advantages.map((adv) => (
          <li key={adv}>{adv}</li>
        ))}
      </ul>
      <div className="flex justify-center py-3">
        <button className="bg-gray-700 text-white p-3 rounded-2xl">
          Subscribe
        </button>
      </div>
    </div>
  );
}
