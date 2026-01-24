interface ProfileCardProps {
    name: string;
    email: string;
    role: string;
    image?: string | null;
}

export function ProfileCard({ name, email, role, image }: ProfileCardProps) {
    return (
        <div
            className="
            bg-white border border-gray-200 rounded-2xl shadow-sm
            p-8 transition-all duration-300
            hover:shadow-md hover:-translate-y-0.5"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">

                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center text-4xl font-semibold text-gray-600">
                    {image ? (
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full rounded-full object-cover"
                        />
                    ) : (
                        name.charAt(0).toUpperCase()
                    )}
                </div>

                {/* Info */}
                <div className="flex-1">
                    <h2 className="text-2xl font-medium text-gray-900 capitalize">
                        {name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                        {email}
                    </p>

                    <span
                        className="
                        inline-block mt-3 px-4 py-1.5 text-xs
                        tracking-widest uppercase rounded-full
                        bg-black text-white"
                    >
                        {role}
                    </span>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gray-200 my-8" />

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                    className="
                    w-full px-6 py-3 rounded-md
                    border border-gray-300 text-gray-800
                    hover:bg-gray-50 transition"
                >
                    Editar perfil
                </button>

                <button
                    className="
                    w-full px-6 py-3 rounded-md
                    bg-black text-white
                    hover:opacity-90 transition"
                >
                    Seguridad
                </button>
            </div>
        </div>
    );
}
