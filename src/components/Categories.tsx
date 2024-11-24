
type categories = {
    title: string,
    description: string,
    imgSrc: string
}

function CategoryItem({ title, description, imgSrc } : categories) {
  return (
    <div className="flex-shrink-0 w-64 h-64 mx-4 rounded-lg shadow-lg overflow-hidden bg-white ">
      <img className="w-full h-32 object-cover" src={imgSrc} alt={title} />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}

function Categories() {
  const categories = [
    {
      title: 'Photo Frames',
      description: 'Personalized frames for your memories.',
      imgSrc: 'https://via.placeholder.com/250x150',
    },
    {
      title: 'Customized Mugs',
      description: 'Mugs with your favorite designs.',
      imgSrc: 'https://via.placeholder.com/250x150',
    },
    {
      title: 'Gift Sets',
      description: 'Curated gift sets for any special occasion.',
      imgSrc: 'https://via.placeholder.com/250x150',
    },
    {
      title: 'Keychains',
      description: 'Unique and customizable keychains.',
      imgSrc: 'https://via.placeholder.com/250x150',
    },
  ];

  return (
    <div className="w-full py-10 bg-gray-100">
      <div className="flex overflow-x-auto space-x-6 px-4 ">
        {categories.map((category, index) => (
          <CategoryItem
            key={index}
            title={category.title}
            description={category.description}
            imgSrc={category.imgSrc}
          />
        ))}
      </div>
    </div>
  );
}

export default Categories;

