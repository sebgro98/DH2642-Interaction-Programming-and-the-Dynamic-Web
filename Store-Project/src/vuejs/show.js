const Show = {
    props: ["hash"],
    data() {
        return {
            hashState: window.location.hash,
        };
    },

    methods: {
        hashListenerACB(e) {
            this.hashState = window.location.hash
        }
    },

    created() {
        window.addEventListener("hashchange", this.hashListenerACB);
    },

    unmounted() {
        window.removeEventListener("hashchange", this.hashListenerACB);
    },

    render() {
        return (
            <span class={this.hashState === this.hash ? "" : "hidden"}>
                {this.$slots.default()}
            </span>
        );
    },
};

export default Show