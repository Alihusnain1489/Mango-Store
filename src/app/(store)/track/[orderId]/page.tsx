export default function TrackOrderPage({ params }: { params: { orderId: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Track Order</h1>
      <p className="text-gray-600">Order ID: {params.orderId}</p>
      <p className="mt-4">Order tracking coming soon.</p>
    </div>
  );
}