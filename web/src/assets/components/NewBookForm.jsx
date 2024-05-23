import { useState, useRef, useEffect } from 'react';
import '../style/NewBookForm.css';

function NewBookForm() {

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
            "description": ""
    })

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
        event.preventDefault();
        if (!file) return;

        const formDataToSubmit = new FormData();
        formDataToSubmit.append('img', file);
        formDataToSubmit.append('title', formData.title);
        formDataToSubmit.append('author', formData.author);
        formDataToSubmit.append('pages', formData.pages);
        formDataToSubmit.append('category', formData.category);
        formDataToSubmit.append('description', formData.description);

        try {
            console.log(formData)
            const response = await fetch('http://localhost:80/upload', {
                method: 'POST',
                body: formDataToSubmit,
            });
            if (response.ok) {
                alert('Image uploaded successfully');
            } else {
                alert('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleUpdate = (property, value) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [property]: value
        }));
    };

    // Déclaration de selectRef avec useRef
    const selectRef = useRef(null);

    useEffect(() => {
        // Initialise le select Materialize CSS après le montage du composant
        const selectElement = document.querySelectorAll('select');
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
                            >
                                <option value="" disabled>Choose your option</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                                <label>Materialize Select</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <select
                                ref={selectRef}
                                onChange={(e) => handleUpdate('category', e.target.value)}
                                value={formData.category} // Utilisez value pour définir la valeur sélectionnée
                            >
                                <option value="" disabled>Choose your option</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select>
                                <label>Materialize Select</label>
                            </div>
                        </div>
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
                        <button type='submit'>Envoyer</button>
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
