
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { useAuth } from './contexts/authcontext.provider';



export default function Card1({ task, task_date, id, onreload }) {
    const { access_token } = useAuth()
    const navigate = useNavigate()
    async function deleteTask(id) {


        const res = await fetch(`http://localhost:3000/todo/${id}`, { method: 'delete', headers: { "Authorization": `Bearer ${access_token}` } })
        const data = await res.json()
        if (data['success']) {
            onreload()
        }
    }
    return (
        <Card>
            <Card.Body className="relative w-60 border-2 bg-white rounded-md p-4">
                {/* Cross (×) Delete Button at Top Right */}
                <button
                    aria-label="Close"
                    onClick={() => deleteTask(id)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl font-bold"
                >
                    &times;
                </button>

                <Card.Title className="text-lg font-semibold">{task}</Card.Title>
                <Card.Text className="text-sm text-gray-700">{task_date}</Card.Text>

                <Fragment>
                    <Button
                        onClick={() => navigate(`/edit/${id}`)}
                        className="mt-4 w-full bg-amber-50 border-2 border-amber-300 hover:bg-amber-200 text-sm"
                    >
                        EDIT
                    </Button>
                </Fragment>
            </Card.Body>
        </Card>
    );
}