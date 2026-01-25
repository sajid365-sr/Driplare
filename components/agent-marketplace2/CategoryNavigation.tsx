interface CategoryNavigationProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryNavigation = ({ activeCategory, onCategoryChange }: CategoryNavigationProps) => {
  const categories = [
    { id: 'all', label: '[ ALL_SYSTEMS ]' },
    { id: 'inbox', label: '[ INBOX_MANAGEMENT ]' },
    { id: 'social', label: '[ SOCIAL_PIPELINES ]' },
    { id: 'data', label: '[ DATA_MINING ]' }
  ];

  return (
    <section className="py-8 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <nav className="flex justify-center space-x-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 font-['JetBrains_Mono'] text-sm transition-colors ${
                activeCategory === category.id
                  ? 'text-[#FF6B00] border-b-2 border-[#FF6B00]'
                  : 'text-gray-600 hover:text-[#FF6B00]'
              }`}
            >
              {category.label}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
};

export default CategoryNavigation;
