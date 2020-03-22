package de.wvv.web.rest;

import de.wvv.WirvsvirusApp;
import de.wvv.domain.EmployeeStyle;
import de.wvv.repository.EmployeeStyleRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EmployeeStyleResource} REST controller.
 */
@SpringBootTest(classes = WirvsvirusApp.class)

@AutoConfigureMockMvc
@WithMockUser
public class EmployeeStyleResourceIT {

    private static final String DEFAULT_EMPLOYEE_STYLE = "AAAAAAAAAA";
    private static final String UPDATED_EMPLOYEE_STYLE = "BBBBBBBBBB";

    @Autowired
    private EmployeeStyleRepository employeeStyleRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmployeeStyleMockMvc;

    private EmployeeStyle employeeStyle;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmployeeStyle createEntity(EntityManager em) {
        EmployeeStyle employeeStyle = new EmployeeStyle()
            .employeeStyle(DEFAULT_EMPLOYEE_STYLE);
        return employeeStyle;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EmployeeStyle createUpdatedEntity(EntityManager em) {
        EmployeeStyle employeeStyle = new EmployeeStyle()
            .employeeStyle(UPDATED_EMPLOYEE_STYLE);
        return employeeStyle;
    }

    @BeforeEach
    public void initTest() {
        employeeStyle = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmployeeStyle() throws Exception {
        int databaseSizeBeforeCreate = employeeStyleRepository.findAll().size();

        // Create the EmployeeStyle
        restEmployeeStyleMockMvc.perform(post("/api/employee-styles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(employeeStyle)))
            .andExpect(status().isCreated());

        // Validate the EmployeeStyle in the database
        List<EmployeeStyle> employeeStyleList = employeeStyleRepository.findAll();
        assertThat(employeeStyleList).hasSize(databaseSizeBeforeCreate + 1);
        EmployeeStyle testEmployeeStyle = employeeStyleList.get(employeeStyleList.size() - 1);
        assertThat(testEmployeeStyle.getEmployeeStyle()).isEqualTo(DEFAULT_EMPLOYEE_STYLE);
    }

    @Test
    @Transactional
    public void createEmployeeStyleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = employeeStyleRepository.findAll().size();

        // Create the EmployeeStyle with an existing ID
        employeeStyle.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmployeeStyleMockMvc.perform(post("/api/employee-styles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(employeeStyle)))
            .andExpect(status().isBadRequest());

        // Validate the EmployeeStyle in the database
        List<EmployeeStyle> employeeStyleList = employeeStyleRepository.findAll();
        assertThat(employeeStyleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEmployeeStyles() throws Exception {
        // Initialize the database
        employeeStyleRepository.saveAndFlush(employeeStyle);

        // Get all the employeeStyleList
        restEmployeeStyleMockMvc.perform(get("/api/employee-styles?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(employeeStyle.getId().intValue())))
            .andExpect(jsonPath("$.[*].employeeStyle").value(hasItem(DEFAULT_EMPLOYEE_STYLE)));
    }
    
    @Test
    @Transactional
    public void getEmployeeStyle() throws Exception {
        // Initialize the database
        employeeStyleRepository.saveAndFlush(employeeStyle);

        // Get the employeeStyle
        restEmployeeStyleMockMvc.perform(get("/api/employee-styles/{id}", employeeStyle.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(employeeStyle.getId().intValue()))
            .andExpect(jsonPath("$.employeeStyle").value(DEFAULT_EMPLOYEE_STYLE));
    }

    @Test
    @Transactional
    public void getNonExistingEmployeeStyle() throws Exception {
        // Get the employeeStyle
        restEmployeeStyleMockMvc.perform(get("/api/employee-styles/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmployeeStyle() throws Exception {
        // Initialize the database
        employeeStyleRepository.saveAndFlush(employeeStyle);

        int databaseSizeBeforeUpdate = employeeStyleRepository.findAll().size();

        // Update the employeeStyle
        EmployeeStyle updatedEmployeeStyle = employeeStyleRepository.findById(employeeStyle.getId()).get();
        // Disconnect from session so that the updates on updatedEmployeeStyle are not directly saved in db
        em.detach(updatedEmployeeStyle);
        updatedEmployeeStyle
            .employeeStyle(UPDATED_EMPLOYEE_STYLE);

        restEmployeeStyleMockMvc.perform(put("/api/employee-styles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmployeeStyle)))
            .andExpect(status().isOk());

        // Validate the EmployeeStyle in the database
        List<EmployeeStyle> employeeStyleList = employeeStyleRepository.findAll();
        assertThat(employeeStyleList).hasSize(databaseSizeBeforeUpdate);
        EmployeeStyle testEmployeeStyle = employeeStyleList.get(employeeStyleList.size() - 1);
        assertThat(testEmployeeStyle.getEmployeeStyle()).isEqualTo(UPDATED_EMPLOYEE_STYLE);
    }

    @Test
    @Transactional
    public void updateNonExistingEmployeeStyle() throws Exception {
        int databaseSizeBeforeUpdate = employeeStyleRepository.findAll().size();

        // Create the EmployeeStyle

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmployeeStyleMockMvc.perform(put("/api/employee-styles").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(employeeStyle)))
            .andExpect(status().isBadRequest());

        // Validate the EmployeeStyle in the database
        List<EmployeeStyle> employeeStyleList = employeeStyleRepository.findAll();
        assertThat(employeeStyleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmployeeStyle() throws Exception {
        // Initialize the database
        employeeStyleRepository.saveAndFlush(employeeStyle);

        int databaseSizeBeforeDelete = employeeStyleRepository.findAll().size();

        // Delete the employeeStyle
        restEmployeeStyleMockMvc.perform(delete("/api/employee-styles/{id}", employeeStyle.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EmployeeStyle> employeeStyleList = employeeStyleRepository.findAll();
        assertThat(employeeStyleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
