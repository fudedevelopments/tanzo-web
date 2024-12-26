import DisplayImage from "../utils/imageview";

interface CategoryBoxProps {
    name: string;
    imageUrl: string;
    active?: boolean;
    onClick: () => void;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    name,
    imageUrl,
    active,
    onClick,
}) => {
    return (
        <div
            onClick={onClick}
            className={`
        flex
        flex-col
        items-center
        justify-center
        gap-3
        p-4
        cursor-pointer
        transition
        hover:scale-105
      `}
        >
            <div className={`
        relative
        w-32
        h-32
        md:w-48
        md:h-48
        rounded-full
        overflow-hidden
        border-4
        ${active ? 'border-primary' : 'border-neutral-200'}
        transition
      `}>
            <DisplayImage path={imageUrl} width={200} height={300}/>
            </div>
            <div className={`
        text-lg
        md:text-xl
        font-medium
        text-center
        ${active ? 'opacity-100' : 'opacity-90'}
      `}>
                {name}
            </div>
        </div>
    );
};

export default CategoryBox;
