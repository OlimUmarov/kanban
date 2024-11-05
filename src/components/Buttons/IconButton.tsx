type IconButtonProps = {
    onClick: () => void;
    icon: React.ReactNode;
    hoverColor?: string;
};

export const IconButton = ({ onClick, icon, hoverColor = "" }: IconButtonProps) => (
    <button
        type="button"
        className={`opacity-0 group-hover:opacity-100 hover:bg-gray-100 rounded-full transition-opacity `}
        onClick={onClick}
    >
        <div className={`w-7 h-7 p-1 fill-gray-500 ${hoverColor}`}>{icon}</div>
    </button>
);