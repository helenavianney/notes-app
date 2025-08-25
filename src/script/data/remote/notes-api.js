const baseUrl = 'https://notes-api.dicoding.dev/v2';

class NotesApi {
    static async getNotes() {
        try {
            const response = await fetch(`${baseUrl}/notes`);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseJson = await response.json();
            if (responseJson.error) {
                return Promise.reject(new Error(responseJson.message));
            }
            return responseJson.data;
        } catch (error) {
            return Promise.reject(new Error('Something went wrong'));
        }
    }

    static async addNotes({title, body}) {
        try {
            const response = await fetch(`${baseUrl}/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: String,
                    body: String
                }),
            });
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseJson = await response.json();
            if (responseJson.error) {
                return Promise.reject(new Error(responseJson.message));
            }
            return responseJson.data;
        } catch (error) {
            return Promise.reject(new Error('Something went wrong'));
        }
    }

    static async getArchivedNotes() {
        try {
            const response = await fetch(`${baseUrl}/notes/archived`);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseJson = await response.json();
            if (responseJson.error) {
                return Promise.reject(new Error(responseJson.message));
            }
            return responseJson.data;
        } catch (error) {
            return Promise.reject(new Error('Something went wrong'));
        }
    }

    static async getSingleNote(id) {
        try {
            const response = await fetch(`${baseUrl}/notes/${id}`);
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseJson = await response.json();
            if (responseJson.error) {
                return Promise.reject(new Error(responseJson.message));
            }
            return responseJson.data;
        } catch (error) {
            return Promise.reject(new Error('Something went wrong'));
        }
    }

    static async archiveNote(id) {
        try {
            const response = await fetch(`${baseUrl}/notes/${id}/archive`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseJson = await response.json();
            if (responseJson.error) {
                return Promise.reject(new Error(responseJson.message));
            }
            return responseJson.data;
        } catch (error) {
            return Promise.reject(new Error('Something went wrong'));
        }
    }

    static async unarchiveNote(id) {
        try {
            const response = await fetch(`${baseUrl}/notes/${id}/unarchive`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseJson = await response.json();
            if (responseJson.error) {
                return Promise.reject(new Error(responseJson.message));
            }
            return responseJson.data;
        } catch (error) {
            return Promise.reject(new Error('Something went wrong'));
        }
    }

    static async deleteNote(id) {
        try {
            const response = await fetch(`${baseUrl}/notes/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Something went wrong');
            }
            const responseJson = await response.json();
            if (responseJson.error) {
                return Promise.reject(new Error(responseJson.message));
            }
            return responseJson.data;
        } catch (error) {
            return Promise.reject(new Error('Something went wrong'));
        }
    }
}

export default NotesApi;