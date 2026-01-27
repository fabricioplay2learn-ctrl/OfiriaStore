import { getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  const products = await getProductsByCategory(slug);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-text-primary capitalize">
        {slug === "todas" ? "Todos los Productos" : <>{categoryName} <span className="text-gold">Collection</span></>}
      </h1>
      
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-text-muted">No se encontraron productos en esta categoría.</p>
        </div>
      )}
    </div>
  );
}
