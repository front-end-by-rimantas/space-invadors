class ScoreTable {
    constructor(params) {
        this.selector = '.table';
        this.DOM = null;
        this.results = [
            {
                username: 'Vardenis',
                score: 1000
            },
            {
                username: 'Ciucikas',
                score: 800
            },
        ];
    }

    generateTableList() {
        let HTML = '';
        for (let result of this.results) {
            HTML += `<div class="result">
                        <div class="username">${result.username}</div>
                        <div class="score">${result.score}</div>
                    </div>`;
        }
        return HTML;
    }

    /**
     * Metodas Score table turiniui generuoti
     */
    render() {
        this.DOM = document.querySelector(this.selector);

        const HTML = `<h1>TOP 5</h1>
                    <div class="results">${this.generateTableList()}</div>`;

        this.DOM.innerHTML = HTML;
    }
}

export { ScoreTable }