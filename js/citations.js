class CitationManager {
    constructor() {
        this.citations = {};
    }

    async loadBibTeX(url) {
        try {
            const response = await fetch(url);
            const bibtex = await response.text();
            this.parseBibTeX(bibtex);
            this.renderCitations();
        } catch (error) {
            console.error('Error loading BibTeX:', error);
        }
    }

    parseBibTeX(bibtex) {
        const entries = bibtex.split('@');
        entries.forEach(entry => {
            if (!entry.trim()) return;

            const type = entry.split('{')[0].trim();
            const key = entry.split('{')[1].split(',')[0].trim();
            const fields = {};

            // Parse fields
            entry.match(/(\w+)\s*=\s*{([^}]*)}/g)?.forEach(field => {
                const [name, value] = field.split('=').map(s => s.trim());
                fields[name] = value.replace(/[{}]/g, '');
            });

            this.citations[key] = { type, ...fields };
        });
    }

    formatAuthors(authors) {
        const authorList = authors.split(' and ').map(author => {
            const names = author.split(', ').reverse().join(' ');
            return names;
        });

        if (authorList.length === 1) return authorList[0];
        if (authorList.length === 2) return `${authorList[0]} and ${authorList[1]}`;

        return authorList.slice(0, -1).join(', ') + ', and ' + authorList[authorList.length - 1];
    }

    getPublicationInfo(citation) {
        if (citation.archivePrefix === 'arXiv') {
            return {
                link: citation.url,
                identifier: `arXiv:${citation.eprint}`,
                category: citation.primaryClass ? `[${citation.primaryClass}]` : ''
            };
        } else if (citation.DOI) {
            return {
                link: `https://doi.org/${citation.DOI}`,
                identifier: `DOI:${citation.DOI}`,
                category: citation.publisher ? `[${citation.publisher}]` : ''
            };
        } else if (citation.url) {
            return {
                link: citation.url,
                identifier: citation.publisher || 'Link',
                category: ''
            };
        }
        return null;
    }

    renderCitations() {
        const publicationsList = document.querySelector('.publications-list');
        if (!publicationsList) return;

        publicationsList.innerHTML = '';

        Object.entries(this.citations).forEach(([key, citation]) => {
            const pubInfo = this.getPublicationInfo(citation);
            if (!pubInfo) return;

            const li = document.createElement('li');
            li.classList.add('publication-item');
            li.innerHTML = `
                <a href="${pubInfo.link}" target="_blank" class="publication-link">
                    <h3>${citation.title}</h3>
                    <p class="authors">${this.formatAuthors(citation.author)} (${citation.year})</p>
                    <div class="publication-links">
                        <span class="identifier">${pubInfo.identifier}</span>
                        ${pubInfo.category ? `<span class="publication-category">${pubInfo.category}</span>` : ''}
                    </div>
                </a>
            `;
            publicationsList.appendChild(li);
        });
    }
}

// Initialize and use
document.addEventListener('DOMContentLoaded', () => {
    const citationManager = new CitationManager();
    citationManager.loadBibTeX('citations.bib');
}); 