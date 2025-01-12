package com.PAP_team_21.flashcards.controllers;

import com.PAP_team_21.flashcards.entities.customer.Customer;
import com.PAP_team_21.flashcards.entities.customer.CustomerRepository;
import com.PAP_team_21.flashcards.entities.customer.CustomerService;
import com.PAP_team_21.flashcards.entities.folder.FolderJpaRepository;
import com.PAP_team_21.flashcards.entities.friendship.Friendship;
import com.PAP_team_21.flashcards.entities.friendship.FriendshipRepository;
import com.PAP_team_21.flashcards.entities.notification.NotificationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.security.core.Authentication;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class CustomerControllerTest {

    private MockMvc mockMvc;

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private NotificationRepository notificationRepository;

    @Mock
    private FriendshipRepository friendshipRepository;

    @Mock
    private CustomerService customerService;

    @Mock
    private FolderJpaRepository folderJpaRepository;

    @InjectMocks
    private CustomerController customerController;

    private Customer testCustomer;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(customerController).build();
    }

    @Test
    public void testGetCustomerByIdSuccess() throws Exception {
        String email = "test@example.com";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(email);

        Customer mockCustomer = new Customer();
        mockCustomer.setId(1);
        mockCustomer.setEmail(email);
        when(customerRepository.findByEmail(email)).thenReturn(Optional.of(mockCustomer));
        when(customerRepository.findById(1)).thenReturn(Optional.of(mockCustomer));

        mockMvc.perform(get("/customer/findById/1").principal(authentication))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.email").value(email));
    }

    @Test
    public void testGetCustomerByIdNotFound() throws Exception {
        String email = "test@example.com";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(email);

        when(customerRepository.findByEmail(email)).thenReturn(Optional.of(new Customer()));
        when(customerRepository.findById(1)).thenReturn(Optional.empty());

        mockMvc.perform(get("/customer/findById/1").principal(authentication))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").value("Customer not found"));
    }
    @Test
    public void testGetCustomerByEmailSuccess() throws Exception {
        String userEmail = "testuser@example.com";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(userEmail);

        Customer mockCustomer = new Customer();
        mockCustomer.setId(1);
        mockCustomer.setEmail(userEmail);

        when(customerRepository.findByEmail(userEmail)).thenReturn(Optional.of(mockCustomer));

        mockMvc.perform(get("/customer/findByEmail/" + userEmail).principal(authentication))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.email").value(userEmail));
    }

    @Test
    public void testGetCustomerByEmailNotFound() throws Exception {
        String userEmail = "testuser@example.com";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(userEmail);

        when(customerRepository.findByEmail(userEmail)).thenReturn(Optional.empty());

        mockMvc.perform(get("/customer/findByEmail/" + userEmail).principal(authentication))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").value("No user with this id found"));
    }

    @Test
    public void testGetCustomerByEmailUserNotAuthenticated() throws Exception {
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(null);

        mockMvc.perform(get("/customer/findByEmail/testuser@example.com").principal(authentication))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").value("No user with this id found"));
    }

    @Test
    public void testGetCustomersByUsernameSuccess() throws Exception {
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("test@example.com");

        Customer mockCustomer = new Customer();
        mockCustomer.setId(1);
        mockCustomer.setEmail("test@example.com");
        when(customerRepository.findByEmail("test@example.com")).thenReturn(Optional.of(mockCustomer));

        List<Customer> mockCustomers = new ArrayList<>();
        mockCustomers.add(mockCustomer);
        when(customerService.findByUsername("testuser")).thenReturn(mockCustomers);

        mockMvc.perform(get("/customer/findByUsername/testuser").principal(authentication))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].email").value("test@example.com"));
    }

    @Test
    public void testGetCustomersByUsernameSuccessMultipleCustomers() throws Exception {
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("test@example.com");

        Customer mockCustomer1 = new Customer();
        mockCustomer1.setId(1);
        mockCustomer1.setEmail("test1@example.com");

        Customer mockCustomer2 = new Customer();
        mockCustomer2.setId(2);
        mockCustomer2.setEmail("test2@example.com");

        when(customerRepository.findByEmail("test@example.com")).thenReturn(Optional.of(mockCustomer1));

        List<Customer> mockCustomers = new ArrayList<>();
        mockCustomers.add(mockCustomer1);
        mockCustomers.add(mockCustomer2);

        when(customerService.findByUsername("testuser")).thenReturn(mockCustomers);

        mockMvc.perform(get("/customer/findByUsername/testuser").principal(authentication))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].email").value("test1@example.com"))
                .andExpect(jsonPath("$[1].id").value(2))
                .andExpect(jsonPath("$[1].email").value("test2@example.com"));
    }


    @Test
    public void testGetCustomersByUsernameNotFound() throws Exception {
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("test@example.com");

        Customer mockCustomer = new Customer();
        mockCustomer.setId(1);
        mockCustomer.setEmail("test@example.com");
        when(customerRepository.findByEmail("test@example.com")).thenReturn(Optional.of(mockCustomer));

        when(customerService.findByUsername("testuser")).thenReturn(new ArrayList<>());

        mockMvc.perform(get("/customer/findByUsername/testuser").principal(authentication))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").value("Customer not found"));
    }

    @Test
    public void testGetCustomersByUsernameNoAuthentication() throws Exception {
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(null);

        mockMvc.perform(get("/customer/findByUsername/testuser"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").value("Authentication required"));
    }

    @Test
    public void testGetCustomersByUsernameNoUserFound() throws Exception {
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("test@example.com");

        when(customerRepository.findByEmail("test@example.com")).thenReturn(Optional.empty());

        mockMvc.perform(get("/customer/findByUsername/testuser").principal(authentication))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$").value("No user with this id found"));
    }

    @Test
    public void testDeleteCustomerSuccess() throws Exception {
        String email = "test@example.com";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(email);

        Customer mockCustomer = new Customer();
        mockCustomer.setEmail(email);

        when(customerRepository.findByEmail(email)).thenReturn(Optional.of(mockCustomer));

        mockMvc.perform(delete("/customer/delete").principal(authentication))
                .andExpect(status().isOk())
                .andExpect(content().string("Customer deleted successfully"));

        verify(customerRepository, times(1)).delete(mockCustomer);
        verify(folderJpaRepository, times(1)).delete(mockCustomer.getRootFolder());
    }

    @Test
    public void testDeleteCustomerNotFound() throws Exception {
        String email = "test@example.com";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(email);

        when(customerRepository.findByEmail(email)).thenReturn(Optional.empty());

        mockMvc.perform(delete("/customer/delete").principal(authentication))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("No user found with this id"));

        verify(customerRepository, times(0)).delete(any());
        verify(folderJpaRepository, times(0)).delete(any());
    }

    @Test
    public void testDeleteCustomerNoAuthentication() throws Exception {
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(null);

        mockMvc.perform(delete("/customer/delete").principal(authentication))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("No user found with this id"));

        verify(customerRepository, times(0)).findByEmail(any());
        verify(folderJpaRepository, times(0)).delete(any());
    }

    @Test
    public void testGetSelfSuccess() throws Exception {
        String email = "testuser@example.com";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(email);

        Customer mockCustomer = new Customer();
        mockCustomer.setId(1);
        mockCustomer.setEmail(email);
        when(customerRepository.findByEmail(email)).thenReturn(Optional.of(mockCustomer));

        mockMvc.perform(get("/customer/getSelf").principal(authentication))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.email").value(email));
    }

    @Test
    public void testGetSelfUserNotFound() throws Exception {
        String email = "testuser@example.com";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(email);

        when(customerRepository.findByEmail(email)).thenReturn(Optional.empty());

        mockMvc.perform(get("/customer/getSelf").principal(authentication))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("No user with this id found"));
    }

    @Test
    public void testGetSelfNoAuthentication() throws Exception {
        mockMvc.perform(get("/customer/getSelf"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("No user with this id found"));
    }

    @Test
    public void testGetReceivedFriendshipsSuccess() throws Exception {
        String email = "test@example.com";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(email);

        Customer mockCustomer = new Customer();
        mockCustomer.setEmail(email);

        Friendship friendship1 = new Friendship();
        friendship1.setId(1);

        Friendship friendship2 = new Friendship();
        friendship2.setId(2);

        mockCustomer.setReceivedFriendships(List.of(friendship1, friendship2));

        when(customerRepository.findByEmail(email)).thenReturn(Optional.of(mockCustomer));

        mockMvc.perform(get("/customer/getReceivedFriendships").principal(authentication))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[1].id").value(2));

        verify(customerRepository, times(1)).findByEmail(email);
    }

    @Test
    public void testGetReceivedFriendshipsUserNotFound() throws Exception {
        String email = "nonexistent@example.com";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(email);

        when(customerRepository.findByEmail(email)).thenReturn(Optional.empty());

        mockMvc.perform(get("/customer/getReceivedFriendships").principal(authentication))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("No user with this id found"));

        verify(customerRepository, times(1)).findByEmail(email);
    }

    @Test
    public void testGetReceivedFriendshipsNoFriendships() throws Exception {
        String email = "test@example.com";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(email);

        Customer mockCustomer = new Customer();
        mockCustomer.setEmail(email);
        mockCustomer.setReceivedFriendships(Collections.emptyList());

        when(customerRepository.findByEmail(email)).thenReturn(Optional.of(mockCustomer));

        mockMvc.perform(get("/customer/getReceivedFriendships").principal(authentication))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        verify(customerRepository, times(1)).findByEmail(email);
    }

    @Test
    public void testGetSentFriendshipsSuccess() throws Exception {
        String email = "test@example.com";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(email);

        Customer mockCustomer = new Customer();
        mockCustomer.setEmail(email);

        Friendship friendship1 = new Friendship();
        friendship1.setId(1);;

        Friendship friendship2 = new Friendship();
        friendship2.setId(2);

        mockCustomer.setSentFriendships(List.of(friendship1, friendship2));

        when(customerRepository.findByEmail(email)).thenReturn(Optional.of(mockCustomer));

        mockMvc.perform(get("/customer/getSentFriendships").principal(authentication))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[1].id").value(2));

        verify(customerRepository, times(1)).findByEmail(email);
    }

    @Test
    public void testGetSentFriendshipsUserNotFound() throws Exception {
        String email = "nonexistent@example.com";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(email);

        when(customerRepository.findByEmail(email)).thenReturn(Optional.empty());

        mockMvc.perform(get("/customer/getSentFriendships").principal(authentication))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("No user with this id found"));

        verify(customerRepository, times(1)).findByEmail(email);
    }

    @Test
    public void testGetSentFriendshipsNoFriendships() throws Exception {
        String email = "test@example.com";
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(email);

        Customer mockCustomer = new Customer();
        mockCustomer.setEmail(email);
        mockCustomer.setSentFriendships(Collections.emptyList());

        when(customerRepository.findByEmail(email)).thenReturn(Optional.of(mockCustomer));

        mockMvc.perform(get("/customer/getSentFriendships").principal(authentication))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));

        verify(customerRepository, times(1)).findByEmail(email);
    }

}
