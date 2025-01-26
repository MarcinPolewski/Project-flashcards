package com.PAP_team_21.flashcards;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import java.io.ByteArrayInputStream;
import java.io.ObjectInputStream;
import java.util.Base64;

@Service
public class VerificationTokenGenerator {

    private static final String ALGORITHM = "AES";

    private SecretKey secretKey;

    @Autowired
    public VerificationTokenGenerator(SecretKey secretKey) {
        this.secretKey = secretKey;
    }



    public static Object deserialize(byte[] decryptedBytes) throws Exception {
        try (ByteArrayInputStream bis = new ByteArrayInputStream(decryptedBytes);
             ObjectInputStream ois = new ObjectInputStream(bis)) {
            return ois.readObject(); // Deserialize and return the object
        }
    }

    public String encodeObject(Object obj) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        byte[] encryptedBytes = cipher.doFinal(obj.toString().getBytes());
        return Base64.getEncoder().encodeToString(encryptedBytes);
    }


    public Object decodeToken(String token) throws Exception {
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] decodedBytes = Base64.getDecoder().decode(token);
        byte[] decryptedBytes = cipher.doFinal(decodedBytes);
        return deserialize(decryptedBytes);
    }
}

