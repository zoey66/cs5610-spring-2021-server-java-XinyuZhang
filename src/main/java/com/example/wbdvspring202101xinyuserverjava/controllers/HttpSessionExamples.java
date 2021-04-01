package com.example.wbdvspring202101xinyuserverjava.controllers;
import com.example.wbdvspring202101xinyuserverjava.models.User;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class HttpSessionExamples {
    List<User> users = new ArrayList<User>();

    @GetMapping("/api/register/{username}/{password}")
    public User register(
            @PathVariable("username") String username,
            @PathVariable("password") String password,
            HttpSession session) {
        User user = new User();
        user.setPassword(password);
        user.setUsername(username);
        session.setAttribute("currentUser", user);
        users.add(user);
        return user;
    }

    @GetMapping("/api/profile")
    public User profile(HttpSession session) {
        User currentUser = (User)
                session.getAttribute("currentUser");
        return currentUser;
    }

    @GetMapping("/api/logout")
    public void logout
            (HttpSession session) {
        session.invalidate();
    }

    @GetMapping("/api/login/{username}/{password}")
    public User login(
            @PathVariable("username") String username,
            @PathVariable("password") String password,
            HttpSession session) {
        for (User user : users) {
            if( user.getUsername().equals(username)
                    && user.getPassword().equals(password)) {
                session.setAttribute("currentUser", user);
                return user;
            }
        }
        return null;
    }




    @GetMapping("/api/session/set/{attr}/{value}")
    public String setSessionAttribute(
            @PathVariable("attr") String attr,
            @PathVariable("value") String value,
            HttpSession session) {
        session.setAttribute(attr, value);
        return attr + " = " + value;
    }
    @GetMapping("/api/session/get/{attr}")
    public String getSessionAttribute(
            @PathVariable ("attr") String attr,
            HttpSession session) {
        return (String)session.getAttribute(attr);
    }
    @GetMapping("/api/session/invalidate")
    public String invalidateSession(
            HttpSession session) {
        session.invalidate();
        return "session invalidated";
    }
}