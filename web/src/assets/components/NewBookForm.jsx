import { useState, useRef, useEffect } from 'react';
import '../style/NewBookForm.css';

function NewBookForm() {

    const address = 'localhost'
    const port = 80
    //--------
    //---------STATES
    //--------

    const [form, setForm] = useState(false); // État pour afficher ou cacher le formulaire
    const [file, setFile] = useState(null); // État pour stocker le fichier sélectionné
    const fileInputRef = useRef(null); // Création de la ref pour l'élément d'entrée de fichier
    const [formData, setFormData] = useState({
            "title": "",
            "img": "",
            "author": "",
            "pages": "",
            "category": "",
            "genre": "",
            "description": ""
    })
    const [genres, setGenres] = useState([])
    const [categories, setCategories] = useState([])

    //--------
    //---------FONCTIONS
    //--------

    const showForm = () => {
        setForm(true); // Affiche le formulaire
    };

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile); // Met à jour l'état avec le fichier sélectionné
            handleUpdate('img', selectedFile.name); // Met à jour formData avec le nom du fichier
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    
        if (!file) return; // Si aucun fichier n'est sélectionné, arrête la fonction
    
        const formDataToSubmit = new FormData(); // Crée un nouvel objet FormData pour contenir les données à envoyer
        formDataToSubmit.append('img', file); // Ajoute le fichier d'image au FormData
    
        try {
            // Envoie le fichier d'image au serveur pour le téléchargement
            const response = await fetch(`http://${address}:${port}/upload`, {
                method: 'POST',
                body: formDataToSubmit,
            });
    
            if (response.ok) {
                // Si l'image a été téléchargée avec succès, analyse la réponse JSON du serveur
                const data = await response.json();
    
                // Met à jour le champ 'img' dans formData avec le nom de fichier renvoyé par le serveur
                handleUpdate('img', data.filename);
    
                // Continue avec la soumission des autres données du formulaire
                const bookResponse = await fetch(`http://${address}:${port}/addBook`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...formData, // Copie toutes les données actuelles du formulaire
                        img: data.filename // Met à jour le champ img avec le nom du fichier reçu du serveur
                    })
                });
    
                if (bookResponse.ok) {
                    alert('Le livre a été ajouté avec succès!'); // Alerte l'utilisateur que le livre a été ajouté avec succès
                } else {
                    alert('Quelque chose ne va pas avec l\'envoi du livre'); // Alerte l'utilisateur en cas d'échec de l'ajout du livre
                }
            } else {
                alert('Impossible d\'envoyer l\'image au serveur'); // Alerte l'utilisateur en cas d'échec du téléchargement de l'image
            }
        } catch (error) {
            console.error('Error uploading image:', error); // Log l'erreur en cas de problème lors du téléchargement de l'image
        }
    };
    
    

    const handleUpdate = (property, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [property]: value
        }));
    }; 

    const getGenres = async () =>{
        const response = await fetch(`http://${address}:${port}/genres`)
        const allGenres = await response.json()
        setGenres(allGenres)
    }

    const getCategories = async () =>{
        const response = await fetch(`http://${address}:${port}/categories`)
        const allCategories = await response.json()
        setCategories(allCategories)
    }

    // Déclaration de selectRef avec useRef
    const selectRef = useRef(null);

    useEffect(() => {
        getGenres()
        getCategories()
        // Initialise le select Materialize CSS après le montage du composant
        const selectElement = document.querySelectorAll('select');
        // eslint-disable-next-line no-undef
        M.FormSelect.init(selectElement);
    }, [form]);

    //--------
    //---------RETURNS
    //--------

    const addButton = (
        <button onClick={showForm} className='addBookButton'>
            <img src='/img/plus.png' alt='Add book' />
        </button>
    );

    const newform = (
        <div className='container'>
            <div className='bookContainer'>
                <div className='book'>
                    {/* Affiche l'image sélectionnée */}
                    {file && <img className="cover" src={URL.createObjectURL(file)} alt='Selected' />}
                </div>
            </div>
            {/* FORMULAIRE */}
            <div className='newbookForm'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="title" type="text" className="validate" value={formData.title} onChange={(e) => handleUpdate('title', e.target.value)}/>
                                <label htmlFor="title">Titre</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="author" type="text" className="validate" value={formData.author} onChange={(e) => handleUpdate('author', e.target.value)}/>
                                <label htmlFor="author">Auteur</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <input id="pages" type="number" className="validate" value={formData.pages} onChange={(e) => handleUpdate('pages', e.target.value)}/>
                                <label htmlFor="pages">Pages</label>
                            </div>
                        </div>
                    </div>
                    {/*Deuxième colonne du formulaire*/}
                    <div>
                         <div className="row">
                            <div className="input-field col s12">
                                <input id="description" type="text" className="validate" value={formData.description} onChange={(e) => handleUpdate('description', e.target.value)}/>
                                <label htmlFor="description">Description</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <select
                                ref={selectRef}
                                onChange={(e) => handleUpdate('category', e.target.value)}
                                value={formData.category} // Utilisez value pour définir la valeur sélectionnée
                                id='categoriesSelect'
                            >
                                <option value="" disabled>Catégorie</option>
                                {categories.map((category, index) => (
                                        <option key={index} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <select
                                ref={selectRef}
                                onChange={(e) => handleUpdate('genre', e.target.value)}
                                value={formData.genre} // Utilisez value pour définir la valeur sélectionnée
                                id='genresSelect'
                            >
                                <option value="" disabled>Genre</option>
                                {genres.map((genre, index) => (
                                        <option key={index} value={genre.name}>{genre.name}</option>
                                ))}
                            </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="file-field input-field">
                            <div className="btn">
                                <span>Image</span>
                                <input
                                    type="file"
                                    accept='.png, .jpg, .jpeg'
                                    onChange={handleFileChange}
                                    ref={fileInputRef} // Attache la ref à l'élément d'entrée de fichier
                                />
                            </div>
                            <div className="file-path-wrapper">
                                <input
                                    className="file-path validate"
                                    type="text"
                                    placeholder="Importez une image"
                                    readOnly
                                    value={file ? file.name : ''} // Affiche le nom du fichier sélectionné
                                />
                            </div>
                        </div>
                        <button id='submitButton' type='submit'>Envoyer</button>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <section className='newbookformSection'>
            {form ? newform : addButton} {/* Affiche soit le formulaire soit le bouton d'ajout*/}
        </section>
    );
}

export default NewBookForm;
