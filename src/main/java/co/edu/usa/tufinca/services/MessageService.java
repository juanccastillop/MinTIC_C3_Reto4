package co.edu.usa.tufinca.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.edu.usa.tufinca.entities.Message;
import co.edu.usa.tufinca.repository.MessageRepository;

@Service
public class MessageService {
    
    @Autowired
    private MessageRepository messageRepository;

    public List<Message> getAll(){
        return messageRepository.getAll();
    }

    public Optional<Message> getMessage(int mensajeId) {
        return messageRepository.getMessage(mensajeId);
    }

    public Message save(Message mensaje){
        if(mensaje.getIdMessage()==null){
            return messageRepository.save(mensaje);
        }else{
            Optional<Message> messageaux= messageRepository.getMessage(mensaje.getIdMessage());
            if(messageaux.isEmpty()){
                return messageRepository.save(mensaje);
            }else{
                return mensaje;
            }
        }
    }

    public Message update(Message mensaje){
        if(mensaje.getIdMessage()!=null){
            Optional<Message> messageaux= messageRepository.getMessage(mensaje.getIdMessage());
            if(!messageaux.isEmpty()){
                if(mensaje.getMessageText()!=null){
                    messageaux.get().setMessageText(mensaje.getMessageText());
                }
                messageRepository.save(messageaux.get());
                return messageaux.get();
            }else{
                return mensaje;
            }
        }else{
            return mensaje;
        }
    }

    public boolean deleteMessage(int mensajeId) {
        Boolean aBoolean = getMessage(mensajeId).map(mensaje -> {
            messageRepository.delete(mensaje);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
