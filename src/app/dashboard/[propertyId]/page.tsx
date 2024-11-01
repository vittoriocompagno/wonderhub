import { Suspense } from "react"

export default function PropertyPage({ params }: { params: { propertyId: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold mb-4">Property Details</h1>
        <p>Property ID: {params.propertyId}</p>
      </div>
    </Suspense>
  )
}
