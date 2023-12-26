const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			user: null,
			token: localStorage.getItem("token"),
		},
		actions: {
			createUser: async (username, email, password) => {
				const opts = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						"username": username,
						"email": email,
						"password": password,
						"active": true
					})
				};
				try {
					const result = await fetch("https://upgraded-halibut-g9pjqw9vxgq299gj-3001.app.github.dev/api/users", opts)
					console.log(result)
				} catch {
					console.log("Error de registro [flux]", error)
				}
			},

			login: async (email, password) => {
				console.log("información llegando a login", email, password)
				const opts = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						"email": email,
						"password": password,
					}),
				};
				const res = await fetch("https://upgraded-halibut-g9pjqw9vxgq299gj-3001.app.github.dev/api/login", opts);

				if (!res.ok) {
					throw new Error(`Network response was not ok: ${res.status}`);
				}

				if (res.status < 200 || res.status >= 300) {
					throw new Error("There was an error signing in");
				}

				const data = await res.json();
				console.log("Data login", data)

				localStorage.setItem("token", data.token);

				console.log("USER INFO HERE", data)

				return data;
			},


		}
	};
};

export default getState;
