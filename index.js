let participantes = [

    {
        nome: "Stefanie Pires",
        email: "stefanie@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 1, 25, 22, 00)
    },
    {
        nome: "João Silva",
        email: "joao.silva@example.com",
        dataInscricao: new Date(2024, 2, 20, 10, 30),
        dataCheckIn: new Date(2024, 1, 24, 14, 45)
    },
    {
        nome: "Maria Santos",
        email: "maria.santos@example.com",
        dataInscricao: new Date(2024, 2, 18, 15, 45),
        dataCheckIn: new Date(2024, 1, 23, 9, 15)
    },
    {
        nome: "Pedro Almeida",
        email: "pedro.almeida@example.com",
        dataInscricao: new Date(2024, 2, 15, 11, 10),
        dataCheckIn: new Date(2024, 1, 22, 18, 30)
    },
    {
        nome: "Ana Costa",
        email: "ana.costa@example.com",
        dataInscricao: new Date(2024, 2, 10, 8, 55),
        dataCheckIn: new Date(2024, 1, 20, 20, 40)
    },
    {
        nome: "Ricardo Oliveira",
        email: "ricardo.oliveira@example.com",
        dataInscricao: new Date(2024, 2, 5, 16, 20),
        dataCheckIn: new Date(2024, 1, 18, 12, 10)
    },
    {
        nome: "Carla Pereira",
        email: "carla.pereira@example.com",
        dataInscricao: new Date(2024, 1, 28, 14, 30),
        dataCheckIn: new Date(2024, 1, 16, 9, 25)
    },
    {
        nome: "Luís Fernandes",
        email: "luis.fernandes@example.com",
        dataInscricao: new Date(2024, 1, 25, 9, 45),
        dataCheckIn: new Date(2024, 1, 14, 15, 55)
    },
    {
        nome: "Sofia Gonçalves",
        email: "sofia.goncalves@example.com",
        dataInscricao: new Date(2024, 1, 20, 12, 15),
        dataCheckIn: new Date(2024, 1, 12, 11, 20)
    },
    {
        nome: "Carlos Sousa",
        email: "carlos.sousa@example.com",
        dataInscricao: new Date(2024, 1, 15, 18, 50),
        dataCheckIn: new Date(2024, 1, 10, 13, 30)
    }
];

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if (participante.dataCheckIn == null) {
        dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
    }


    return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}


const atualizarLista = (participantes) => {
    let output = ""
    for (let participante of participantes) {
        output = output + criarNovoParticipante(participante)
    }

    // substituir informação do HTML
    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()
    const dadosDoFormulario = new FormData(event.target)

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }
    //verificar se o participante ja existe
    const participanteExiste = participantes.find( //find: procurar
        (p) => {
            return p.email == participante.email
        }
    )
    if (participanteExiste) {
        alert('Email já cadastrado!')
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    //limpar o formulario
    event.target.querySelector('[name="nome"]').value = ''
    event.target.querySelector('[name="email"]').value = ''
}

const fazerCheckIn = (event) => {
    //confirmar se realmente quer o check-in
    const mensagem = 'Tem certeza que deseja fazer o check-in?'
    if (confirm(mensagem) == false) {
        return
    } //true or false - boolean

    //encontrar o participante na lista
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })
    //atualizar check-in do participante
    participante.dataCheckIn = new Date()
    //atualizar lista de participantes
    atualizarLista(participantes)
}