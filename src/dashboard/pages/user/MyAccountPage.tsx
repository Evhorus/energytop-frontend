export const MyAccountPage = () => {
    return (
        <>
            <div className="mx-auto max-w-3xl g">
                <h1 className="text-5xl font-black ">Mi Perfil</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    Aquí puedes actualizar tu información
                </p>

                <form
                    // onSubmit={handleSubmit(handleEditProfile)}
                    className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
                    noValidate
                >
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >
                            Nombre
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Nombre"
                            className="w-full p-3  border border-gray-200"
                            // {...register("name", {
                            //   required: "Nombre de usuario es obligatoro",
                            // })}
                        />
                        {/* {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>} */}
                    </div>
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >
                            Apellido
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Tu Apellido"
                            className="w-full p-3  border border-gray-200"
                            // {...register("name", {
                            //   required: "Nombre de usuario es obligatoro",
                            // })}
                        />
                        {/* {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>} */}
                    </div>

                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="password"
                        >
                            Correo electrónico
                        </label>
                        <input
                            id="text"
                            type="email"
                            placeholder="Tu Correo electrónico"
                            className="w-full p-3  border border-gray-200"
                            // {...register("email", {
                            //   required: "EL e-mail es obligatorio",
                            //   pattern: {
                            //     value: /\S+@\S+\.\S+/,
                            //     message: "E-mail no válido",
                            //   },
                            // })}
                        />
                        {/* {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )} */}
                    </div>
                    <div className="mb-5 space-y-3">
                        <label
                            className="text-sm uppercase font-bold"
                            htmlFor="name"
                        >
                            Contraseña
                        </label>
                        <input
                            id="name"
                            type="password"
                            placeholder="Tu Contraseña"
                            className="w-full p-3  border border-gray-200"
                            // {...register("name", {
                            //   required: "Nombre de usuario es obligatoro",
                            // })}
                        />
                        {/* {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>} */}
                    </div>
                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className="bg-indigo-500 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                    />
                </form>
            </div>
        </>
    );
};
